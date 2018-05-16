import React from "react";
import Helmet from "react-helmet"
import leafTwo from "./leaf2.png"
import leafThree from "./leaf3.png"
import leafFour from "./leaf4.png"
import RSVP from './rsvp.png'
import _ from 'underscore'

export default class RSVPPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      invitationFound: false,
    }

    this.submitForm = this.submitForm.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.searchForInvitation = this.searchForInvitation.bind(this)
    this.findFail = this.findFail.bind(this)
    this.successfulFind = this.successfulFind.bind(this)
    this.onGuestInputChange = this.onGuestInputChange.bind(this)
    this.submitSuccess = this.submitSuccess.bind(this)
    this.chooseGuest = this.chooseGuest.bind(this)
  }

  componentDidMount() {
    window.sr = ScrollReveal();
    sr.reveal(".form-group", 50);
  }

  validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  formatGuestNames(guest) {
    return (`${guest.first_name}${guest.last_name === guest.last_name_2 ? '' : ` ${guest.last_name}`}${guest.num_invited > 1 ? ` and ${guest.first_name_2 || 'Guest'}${guest.last_name_2 ? ` ${guest.last_name_2}` : ''}` : ''}${guest.num_invited > 2 ? ' & Family' : ''}`)
  }

  submitForm(event) {
    this.setState({ submitting: true, rsvp: this.state.invitationFound.rsvp })
    event.preventDefault();
    const request = { guest: this.state.invitationFound }
    this.newXHRRequest('PATCH', `/guests/${this.state.invitationFound.id}`, request, this.submitSuccess)
  }

  submitSuccess() {
    window.scrollTo(0, 0)
    this.setState({
      submitted: true,
      submitting: false,
      invitationFound: null,
    })
  }

  chooseGuest(e) {
    e.preventDefault()
    const id = parseInt(e.target.name, 10)
    const invitationFound = _.findWhere(this.state.chooseOne, { id })
    window.scrollTo(0, 0)
    this.setState({
      invitationFound,
      unknownGuest: invitationFound.num_invited > 1 && !invitationFound.first_name_2,
    })
  }

  searchForInvitation(event) {
    this.setState({ submitting: true })
    event.preventDefault()
    let lastName = this.state.last_name_search[0].toUpperCase() + _.rest(this.state.last_name_search).join('')
    const firstName = this.state.first_name_search[0].toUpperCase() + _.rest(this.state.first_name_search).join('')
    if (lastName[1] === "'") { lastName = lastName[0] + lastName[1] + lastName[2].toUpperCase() + _.rest(lastName, 3).join('') }
    const query = `/lookup?last_name=${lastName}&first_name=${firstName}`
    this.setState({ formattedName: firstName })
    this.newXHRRequest('GET', query, null, this.successfulFind, this.findFail)
  }

  onInputChange(e) {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value
    if (val === true) { val = "yes" }
    if (val === false) { val = "false" }
    this.setState({
      [e.target.name]: val
    })
  }

  onGuestInputChange(e) {
    const invitationFound = _.clone(this.state.invitationFound)
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value
    if (val === 'true') { val = true }
    if (val === 'false') { val = false }
    if (e.target.name === 'rsvp_welcome_drinks' || e.target.name === 'rsvp_brunch') {
      val *= invitationFound.num_invited
    }
    invitationFound[e.target.name] = val
    this.setState({ invitationFound })
  }

  newXHRRequest(method, path, content, onSuccess, onErr) {
    // const baseUrl = 'http://localhost:4741'
    const baseUrl = 'https://jaylivia-api.herokuapp.com'
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(JSON.parse(xhr.response));
      } else {
        onErr(xhr)
        console.error(xhr);
      }
    });
    xhr.addEventListener('error', () => onErr(xhr));
    xhr.open(method, baseUrl + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (content) {
      xhr.send(JSON.stringify(content));
    } else {
      xhr.send()
    }
  }

  successfulFind(response) {
    const { guests } = response
    if (!guests || !guests.length) {
      this.setState({
        errorMessage: <span>Oh no! We couldn&#39;t find your invitation. Did you check your spelling? Did we mess up? It&#39;s totally possible!<br />If you need help, contact our IT department (aka Olivia) at olivia.i.m.leach@gmail.com.</span>,
        submitting: false,
      })
    } else if (guests.length > 1) {
      this.setState({
        multipleFound: true,
        chooseOne: guests,
        submitting: false,
      })
    } else {
      window.scrollTo(0, 0)
      this.setState({
        invitationFound: guests[0],
        submitting: false,
        unknownGuest: guests[0].num_invited > 1 && !guests[0].first_name_2,
      })
    }
  }

  findFail() {
    this.setState({
      errorMessage: <span>Oh no! We couldn&#39;t find your invitation. Did you check your spelling? Did we mess up? It&#39;s totally possible!<br />If you need help, contact our IT department (aka Olivia) at olivia.i.m.leach@gmail.com.</span>,
      submitting: false,
    })
  }

  render() {
    return (
      <article className="rsvp">
        <Helmet
          title="RSVP"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <div className="content-wrapper rsvp-page">
          {/*<img className="leaf leaf-two" role="presentation" src={leafTwo} />*/}
          {/*<img className="leaf leaf-three" role="presentation" src={leafThree} />*/}
          {/*<img className="leaf leaf-four" role="presentation" src={leafFour} />*/}

          {!this.state.invitationFound && !this.state.submitted &&
            <div className='rsvp-img'>
              <img alt="Kindly RSVP by May 26th" src={RSVP} />
            </div>
          }

          {this.state.submitted &&
            <div className="thanks">
              <div className="check_mark">
                <div className="sa-icon sa-success animate">
                  <span className="sa-line sa-tip animateSuccessTip"></span>
                  <span className="sa-line sa-long animateSuccessLong"></span>
                  <div className="sa-placeholder"></div>
                  <div className="sa-fix"></div>
                </div>
              </div>
              <h2>Thanks for RSVPing !</h2>
              <p>{this.state.rsvp ? " We'll see you in June!" : " We're sorry you can't make it!"}</p>
            </div>}

          {this.state.invitationFound && <h2>{this.formatGuestNames(this.state.invitationFound)}</h2>}
          {this.state.invitationFound &&
            <form>
              <div className="form-group">
                <p>We cannot wait to see you!<br />Will you be joining us?</p>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="First Name"
                      value={this.state.invitationFound.first_name}
                      disabled
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Last Name"
                      value={this.state.invitationFound.last_name}
                      disabled
                    />
                  </div>
                  <div className='col yesno'>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rsvp"
                          id="inlineRadio1"
                          value={true}
                          onChange={this.onGuestInputChange}
                          defaultChecked={this.state.invitationFound.rsvp === true}
                        /> Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rsvp"
                          id="inlineRadio2"
                          value={false}
                          onChange={this.onGuestInputChange}
                          defaultChecked={this.state.invitationFound.rsvp === false}
                        /> No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.invitationFound.num_invited > 1 &&
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="First Name"
                        value={this.state.invitationFound.first_name_2}
                        disabled={!this.state.unknownGuest}
                        onChange={this.onGuestInputChange}
                        name="first_name_2"
                        placeholder="Guest First Name"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Last Name"
                        value={this.state.invitationFound.last_name_2}
                        disabled={!this.state.unknownGuest}
                        onChange={this.onGuestInputChange}
                        name="last_name_2"
                        placeholder="Guest Last Name"
                      />
                    </div>
                    <div className="col yesno">
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="rsvp_2"
                            id="inlineRadio1"
                            value={true}
                            onChange={this.onGuestInputChange}
                            defaultChecked={this.state.invitationFound.rsvp_2 === true}
                          /> Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="rsvp_2"
                            id="inlineRadio2"
                            value={false}
                            onChange={this.onGuestInputChange}
                            defaultChecked={this.state.invitationFound.rsvp_2 === false}
                          /> No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {(this.state.invitationFound.rsvp || this.state.invitationFound.rsvp_2) &&
                <div>
                  <hr />
                  <div className="form-group">
                    <p>Yessss! How about these fun activities?</p>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="rsvp_welcome_drinks"
                          onChange={this.onGuestInputChange}
                          defaultChecked={this.state.invitationFound.rsvp_welcome_drinks >= 1}
                        /> Welcome drinks on Friday night in Woodstock (8pm)
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="rsvp_brunch"
                          onChange={this.onGuestInputChange}
                          defaultChecked={this.state.invitationFound.rsvp_brunch >= 1}
                        /> Farewell brunch on Sunday morning at Onteora (9 - 11am)
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group">
                    <p>Help us with logistics!<br />Do you know where you are staying?</p>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Hotel name or address of where you're staying"
                        aria-label="Lodging"
                        name="hotel"
                        onChange={this.onGuestInputChange}
                        defaultValue={this.state.invitationFound.hotel}
                      />
                    </div>
                    <p className='small margin-top'><span className='italics'>Psst...</span> Don&#39;t know where you&#39;re staying yet? You can come back and edit this later!</p>
                  </div>
                  <div className="form-group">
                    <p>
                      We are providing bus transportation to the wedding from the following locations: Kingston Best Western, The Lodge, <a target='_blank' href='https://goo.gl/maps/hpymfA4abhy' className='rsvp-link'>downtown Woodstock</a>, and the Emerson.<br /><br />
                      Do you anticipate using the buses?
                      (Keep in mind that parking at the venue exists but is fairly limited.)
                    </p>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label">
                        <input
                          className="form- check-input"
                          type="radio"
                          name="shuttles"
                          id="inlineRadio1"
                          value={this.state.invitationFound.num_invited}
                          onChange={this.onGuestInputChange}
                          defaultChecked={this.state.invitationFound.shuttles >= 1}
                        /> Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="shuttles"
                          id="inlineRadio2"
                          value={0}
                          onChange={this.onGuestInputChange}
                          defaultChecked={this.state.invitationFound.shuttles === 0}
                        /> Nope
                      </label>
                    </div>
                  </div>
                </div>
              }
              <hr />
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="note"
                  id="messageText"
                  rows="3"
                  placeholder={`${this.state.invitationFound.rsvp ? 'Does anyone in your party have any allergies / dietary restrictions? Anything else we missed? ' : ''}Send us a note!`}
                  onChange={this.onGuestInputChange}
                  defaultValue={this.state.invitationFound.note}
                ></textarea>
              </div>
              <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={this.submitForm}
                disabled={this.state.submitting || (this.state.invitationFound.rsvp === null)}
              >Submit{this.state.submitting ? 'ting' : ''}</button>
            </form>}

          {!this.state.invitationFound && !this.state.submitted &&
            <div className="find-form">
              <form>
                <h2>Find your invitation</h2>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="First name" aria-label="First Name" name="first_name_search" onChange={this.onInputChange} />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Last name" aria-label="Last Name" name="last_name_search" onChange={this.onInputChange} />
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  onClick={this.searchForInvitation}
                  disabled={this.state.submitting || !this.state.first_name_search || !this.state.last_name_search}
                >Search</button>
              </form>
              {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
              {this.state.multipleFound &&
                <div>
                  <hr />
                  <p>We couldn&#39;t find an exact match with that name. Does one of these belong to you?</p>
                  {this.state.chooseOne.map(guest =>
                    <div className='form-block'>
                      <button className='btn btn-block btn-secondary margin' onClick={this.chooseGuest} name={guest.id}>
                        {this.formatGuestNames(guest)}
                      </button>
                    </div>
                  )}
                </div>
              }
            </div>}
        </div>
      </article>
    );
  }
}
