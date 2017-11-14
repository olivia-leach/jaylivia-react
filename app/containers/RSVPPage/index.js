import React from 'react';
import Helmet from 'react-helmet';

export default class RSVPPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      message: '',
      rsvp: '',
      rsvpBrunch: '',
    }

    this.submitForm = this.submitForm.bind(this)
    this.tryGet = this.tryGet.bind(this)
    this.setGuestCount = this.setGuestCount.bind(this)
  }

  componentDidMount() {
    window.sr = ScrollReveal();
    sr.reveal('.input', 50);
  }

  // get all data in form and return object
  getFormData() {
    const form = document.getElementById("gform");
    let elements = form.elements; // all form elements
    let fields = Object.keys(elements).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });
    let data = {};
    fields.forEach(function(k){
      data[k] = elements[k].value;
      let str = ""; // declare empty string outside of loop to allow
                    // it to be appended to for each item in the loop
      if(elements[k].type === "checkbox"){ // special case for Edge's html collection
        str = str + elements[k].checked + ", "; // take the string and append
                                                // the current checked value to
                                                // the end of it, along with
                                                // a comma and a space
        data[k] = str.slice(0, -2); // remove the last comma and space
                                    // from the  string to make the output
                                    // prettier in the spreadsheet
      }else if(elements[k].length){
        for(let i = 0; i < elements[k].length; i++){
          if(elements[k].item(i).checked){
            str = str + elements[k].item(i).value + ", "; // same as above
            data[k] = str.slice(0, -2);
          }
        }
      }
    });

    // add form-specific values into the data
    data.formDataNameOrder = JSON.stringify(fields);
    data.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    data.formGoogleSendEmail = form.dataset.email || ""; // no email by default

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

  tryGet(e) {
    e.preventDefault();
    const url = "https://script.google.com/macros/s/AKfycbz8Qm6DWJYMNA2_n6vol9JgiNi26gP63Q0cm7wOL573B-lD9AjY/exec?test=test&callback=?"
    // const url = 'https://script.google.com/macros/s/AKfycbz8Qm6DWJYMNA2_n6vol9JgiNi26gP63Q0cm7wOL573B-lD9AjY/exec?firstName=bob&lastName=smith'
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      console.log(xhr.status, xhr.statusText)
      console.log(xhr.responseText);
      return;
    };

    const data = {
      firstName: 'hi',
      lastName: 'bob'
    }

    // url encode form data for sending as post data
    let encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(data => console.log(data))
  }

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

  setGuestCount(e) {
    this.setState({
      [e.target.name]: e.target.value
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
          <form id='gform'>
            <div className="form-group">
              <label htmlFor="guestCount">Number of guests</label>
              <select className="form-control" id="guestCount" name='guestCount' onChange={this.setGuestCount}>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="form-group">
              {this.state.guestCount == 2 && <label htmlFor="guest1">Human 1</label>}
              <div className='row' id='guest1'>
                <div className='col'>
                  <input type="text" className="form-control" placeholder="First name" aria-label="First Name" name='first_name' />
                </div>
                <div className='col'>
                  <input type="text" className="form-control" placeholder="Last name" aria-label="Last Name" name='last_name' />
                </div>
              </div>
            </div>
            {this.state.guestCount == 2 &&
              <div className="form-group">
                <label htmlFor="guest2">Human 2</label>
                <div className='row' id='guest2'>
                  <div className='col'>
                    <input type="text" className="form-control" placeholder="First name" aria-label="First Name" name='first_name' />
                  </div>
                  <div className='col'>
                    <input type="text" className="form-control" placeholder="Last name" aria-label="Last Name" name='last_name' />
                  </div>
                </div>
              </div>
            }
            <label htmlFor="rsvp">We cannot wait to see you! Will you be joining us?</label>
            <div className="form-check" id='rsvp'>
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> Yay!
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> Nay
              </label>
            </div>
            <div className="form-group">
              <textarea className="form-control" name='message' id="messageText" rows="3" placeholder="Send us a note!"></textarea>
            </div>
            <button className='btn btn-primary btn-block' type='submit' onClick={this.submitForm}>Submit</button>
          </form>
        </div>
      </article>
    );
  }
}
