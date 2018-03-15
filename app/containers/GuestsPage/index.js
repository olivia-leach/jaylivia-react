import React from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore'

export default class GuestsPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      guests: [],
      token: sessionStorage.getItem('token') || '',
    }

    this.logIn = this.logIn.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.signInSuccess = this.signInSuccess.bind(this)
    this.guestFetchSuccess = this.guestFetchSuccess.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleSave = this.toggleSave.bind(this)
    this.handleTableEdit = this.handleTableEdit.bind(this)
    this.getGuests = this.getGuests.bind(this)
  }

  componentWillMount() {
    if (sessionStorage.getItem('token')) {
      this.getGuests()
    }
  }

  onInputChange(e) {
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (val === true) { val = 'yes' }
    if (val === false) { val = 'false' }
    this.setState({
      [e.target.name]: val
    })
  }

  signInSuccess(response) {
    this.setState({
      token: response.user.token,
      person: response.user.email[0].toUpperCase() + _.rest(response.user.email).join(''),
    })

    sessionStorage.setItem('token', response.token)
    this.getGuests()
  }

  getGuests() {
    this.newXHRRequest('GET', '/guests', null, this.guestFetchSuccess)
  }

  guestFetchSuccess(response) {
    const guests = response.guests
    const rsvped = _.filter(guests, g => g.rsvp !== null)
    const numInvited = _.reduce(guests, (memo, num) => memo.num_invited || memo + num.num_invited)
    const rsvpYes = _.filter(guests, g => g.rsvp === true)
    let rsvpCount = 0
    let rsvpYesCount = 0

    if (rsvped.length > 1) {
      rsvpCount = _.reduce(rsvped, (memo, num) => memo.num_invited + num.num_invited)
    } else if (rsvped.length === 1) {
      rsvpCount = rsvped[0].num_invited
    }

    if (rsvpYes.length > 1) {
      rsvpYesCount = _.reduce(rsvpYes, (memo, num) => memo.num_invited + num.num_invited)
    } else if (rsvpYes.length === 1) {
      rsvpYesCount = rsvpYes[0].num_invited
    }

    this.setState({
      guests,
      rsvpCount,
      rsvpYesCount,
      numInvited,
    })
  }

  logIn(e) {
    e.preventDefault()
    const credentials = {
      credentials: {
        email: this.state.username,
        password: this.state.password,
      }
    }
    this.newXHRRequest('POST', '/sign-in', credentials, this.signInSuccess)
  }

  newXHRRequest(method, path, content, onSuccess) {
    // const baseUrl = 'http://localhost:4741'
    const baseUrl = 'https://jaylivia-api.herokuapp.com'
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(JSON.parse(xhr.response));
      } else {
        console.error(JSON.parse(xhr));
      }
    });
    xhr.addEventListener('error', () => onRejected(xhr));
    xhr.open(method, baseUrl + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (content) {
      xhr.send(JSON.stringify(content));
    } else {
      xhr.send()
    }
  }

  toggleEdit(e) {
    this.setState({
      editing: parseInt(e.currentTarget.dataset.id, 10),
      editingItem: {},
    })
  }

  toggleSave() {
    // this.setState({ editing: null })
    console.log('>>>>', this.state.editingItem)
  }

  handleTableEdit(e) {
    const { editingItem } = this.state
    editingItem[e.target.name] = e.target.value
    this.setState({ editingItem })
  }

  render() {
    const rows = this.state.guests.map((guest) => {
      if (guest.id === this.state.editing) {
        return (
          <tr key={`guest-${guest.id}`} onClick={this.toggleSave} data-id={guest.id}>
            <td>{guest.num_invited}</td>
            <td>{guest.first_name}</td>
            <td>{guest.last_name}</td>
            <td>{guest.first_name_2}</td>
            <td><input type="text" defaultValue={guest.last_name_2} className="form-control" placeholder="Last Name" aria-label="Last Name" name='last_name_2' onChange={this.handleTableEdit} /></td>
            <td>{guest.rsvp !== null ? <i className={`fa fa-thumbs-${guest.rsvp ? 'up' : 'down'}`} /> : null}</td>
            <td>{guest.rsvp_welcome_drinks}</td>
            <td>{guest.rsvp_brunch}</td>
            <td>{guest.hotel}</td>
            <td>{guest.shuttles}</td>
            <td>{guest.note}</td>
          </tr>
        )
      }
      return (
        <tr key={`guest-${guest.id}`} onClick={this.toggleEdit} data-id={guest.id}>
          <td>{guest.num_invited}</td>
          <td>{guest.first_name}</td>
          <td>{guest.last_name}</td>
          <td>{guest.first_name_2}</td>
          <td>{guest.last_name_2}</td>
          <td className='center'>{guest.rsvp !== null ? <i className={`fa fa-thumbs-${guest.rsvp ? 'up' : 'down'}`} /> : null}</td>
          <td className='center'>{guest.rsvp_welcome_drinks !== null ? <i className={`fa fa-thumbs-${guest.rsvp_welcome_drinks ? 'up' : 'down'}`} /> : null}</td>
          <td className='center'>{guest.rsvp_brunch !== null ? <i className={`fa fa-thumbs-${guest.rsvp_brunch ? 'up' : 'down'}`} /> : null}</td>
          <td>{guest.hotel}</td>
          <td>{guest.shuttles}</td>
          <td>{guest.note}</td>
        </tr>
      )
    })

    return (
      <article className='rsvp'>
        <Helmet
          title="Guests"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <div className='content-wrapper guests-page'>
          {!this.state.token ?
            <div className='sign-in-form'>
              <div><h4>Hi !</h4></div>
              <form>
                <hr />
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Username" aria-label="Username" name='username' onChange={this.onInputChange} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Password" aria-label="Password" name='password' onChange={this.onInputChange} />
                </div>
                <hr />
                <button className='btn btn-primary btn-block' type='submit' onClick={this.logIn} disabled={this.state.submitting}>Log In</button>
              </form>
            </div> :
            <div className='guests-table'>
              <h4>Hi {this.state.person} !</h4>
              {!rows.length ? <p>Loading guests...</p> :
                <div>
                  <p>Out of {this.state.numInvited} invited, {this.state.rsvpCount} guests have RSVPed! {this.state.rsvpYesCount} people are coming. The acceptance rate so far is {Math.round(this.state.rsvpYesCount / this.state.numInvited) * 100}%.</p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope='col'>Count</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>RSVP</th>
                        <th scope='col'>Welcome Drinks</th>
                        <th scope='col'>Goodbye Brunch</th>
                        <th scope='col'>Hotel</th>
                        <th scope='col'>Shuttles</th>
                        <th scope='col'>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows}
                    </tbody>
                  </table>
                </div>}
            </div>
          }
        </div>
      </article>
    );
  }
}
