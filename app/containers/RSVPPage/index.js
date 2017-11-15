import React from 'react';
import Helmet from 'react-helmet';

export default class RSVPPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      guest_count: '1',
      first_name: '',
      last_name: '',
      first_name_2: '',
      last_name_2: '',
      message: '',
      rsvp: '',
      rsvp_brunch: '',
      rsvp_drinks: '',
      rsvp_rehersal: '',
      rsvp_tubing: '',
    }

    this.submitForm = this.submitForm.bind(this)
    // this.tryGet = this.tryGet.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    window.sr = ScrollReveal();
    sr.reveal('.form-group', 50);
    // sr.reveal('.form-check', 50);
    // sr.reveal('label', 50);
  }

  // get all data in form and return object
  getFormData() {
    // add form-specific values into the data
    const data = this.state
    data.formDataNameOrder = JSON.stringify(data);
    data.formGoogleSheetName = 'responses'; // default sheet name

    console.log(data);
    return data;
  }

  validEmail(email) { // see:
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // tryGet(e) {
  //   e.preventDefault();
  //   const url = "https://script.google.com/macros/s/AKfycbz8Qm6DWJYMNA2_n6vol9JgiNi26gP63Q0cm7wOL573B-lD9AjY/exec?test=test&callback=?"
  //   // const url = 'https://script.google.com/macros/s/AKfycbz8Qm6DWJYMNA2_n6vol9JgiNi26gP63Q0cm7wOL573B-lD9AjY/exec?firstName=bob&lastName=smith'
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', url);
  //   // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   xhr.onreadystatechange = function() {
  //     console.log(xhr.status, xhr.statusText)
  //     console.log(xhr.responseText);
  //     return;
  //   };
  //
  //   const data = {
  //     firstName: 'hi',
  //     lastName: 'bob'
  //   }
  //
  //   // url encode form data for sending as post data
  //   let encoded = Object.keys(data).map(function(k) {
  //       return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  //   }).join('&')
  //   xhr.send(data => console.log(data))
  // }

  submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('gform');
    const data = this.getFormData();         // get the values submitted in the form

    if (this.validateHuman(data.honeypot)) {  // if form is filled, form will not be submitted
      return false;
    }

    const url = 'https://script.google.com/macros/s/AKfycbz8Qm6DWJYMNA2_n6vol9JgiNi26gP63Q0cm7wOL573B-lD9AjY/exec'
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      console.log(xhr.status, xhr.statusText)
      console.log(xhr.responseText);
      return;
    };

    // url encode form data for sending as post data
    let encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  }

  onInputChange(e) {
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (val === true) { val = 'yes' }
    if (val === false) { val = 'false' }
    this.setState({
      [e.target.name]: val
    })
  }

  render() {
    return (
      <article>
        <Helmet
          title="RSVP"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <div className='content-wrapper rsvp-page'>
          {this.state.submitted ?
            <div>Thanks!</div>
          :
          <form id='gform'>
            <div className="form-group">
              <label htmlFor="guestCount">Number of guests</label>
              <select className="form-control" id="guestCount" name='guest_count' onChange={this.onInputChange}>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="form-group">
              {this.state.guest_count == 2 && <label htmlFor="guest1">Human 1</label>}
              <div className='row' id='guest1'>
                <div className='col'>
                  <input type="text" className="form-control" placeholder="First name" aria-label="First Name" name='first_name' onChange={this.onInputChange} />
                </div>
                <div className='col'>
                  <input type="text" className="form-control" placeholder="Last name" aria-label="Last Name" name='last_name' onChange={this.onInputChange} />
                </div>
              </div>
            </div>
            {this.state.guest_count == 2 &&
              <div className="form-group">
                <label htmlFor="guest2">Human 2</label>
                <div className='row' id='guest2'>
                  <div className='col'>
                    <input type="text" defaultValue={this.state.first_name_2} className="form-control" placeholder="First name" aria-label="First Name" name='first_name_2' onChange={this.onInputChange} />
                  </div>
                  <div className='col'>
                    <input type="text" defaultValue={this.state.last_name_2} className="form-control" placeholder="Last name" aria-label="Last Name" name='last_name_2' onChange={this.onInputChange} />
                  </div>
                </div>
              </div>
            }
            <div className='form-group'>
              <p>We cannot wait to see you! Will you be joining us?</p>
            </div>
            <div className='form-group'>
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="rsvp" id="inlineRadio1" value="yes" onChange={this.onInputChange} /> Yay!
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="rsvp" id="inlineRadio2" value="no" onChange={this.onInputChange} /> Nay
                </label>
              </div>
            </div>
            {this.state.rsvp === 'yes' &&
              <div>
                <div className='form-group'>
                  <p>Yessss! How about these fun activities?</p>
                </div>
                <div className='form-group'>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="rsvp_tubing" onChange={this.onInputChange} /> Tubing the Espopus River on Friday in Phoenicia
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="rsvp_drinks" onChange={this.onInputChange} /> Welcome drinks on Friday night in Woodstock
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" name="rsvp_brunch" onChange={this.onInputChange} /> Farewell brunch on Sunday morning at Onteora
                    </label>
                  </div>
                </div>
              </div>
            }
            <div className="form-group">
              <textarea className="form-control" name='message' id="messageText" rows="3" placeholder="Send us a note!" onChange={this.onInputChange}></textarea>
            </div>
            <button className='btn btn-primary btn-block' type='submit' onClick={this.submitForm}>Submit</button>
          </form>}
        </div>
      </article>
    );
  }
}
