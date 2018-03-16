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
      person: sessionStorage.getItem('person') || '',
      cols: [
        { label: '#', center: true },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'First Name', key: 'first_name_2' },
        { label: 'Last Name', key: 'last_name_2' },
        { label: '# Invited', key: 'num_invited', center: true },
        { label: 'Hotel', key: 'hotel' },
        { label: 'Note', key: 'note' },
        { label: 'RSVP', key: 'rsvp', boolean: true },
        { label: 'Fri. Drinks', key: 'rsvp_welcome_drinks', boolean: true },
        { label: 'Brunch', key: 'rsvp_brunch', boolean: true },
        { label: 'Shuttles', key: 'shuttles', boolean: true },
      ]
    }

    this.logIn = this.logIn.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.signInSuccess = this.signInSuccess.bind(this)
    this.guestFetchSuccess = this.guestFetchSuccess.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleSave = this.toggleSave.bind(this)
    this.handleTableEdit = this.handleTableEdit.bind(this)
    this.getGuests = this.getGuests.bind(this)
    this.sortData = this.sortData.bind(this)
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
    const person = response.user.email[0].toUpperCase() + _.rest(response.user.email).join('')
    this.setState({
      token: response.user.token,
      person,
    })

    sessionStorage.setItem('token', response.token)
    sessionStorage.setItem('person', person)
    this.getGuests()
  }

  getGuests() {
    this.newXHRRequest('GET', '/guests', null, this.guestFetchSuccess)
  }

  guestFetchSuccess(response) {
    const guests = _.sortBy(response.guests, 'last_name')
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
      editingItem: {},
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
    const id = parseInt(e.currentTarget.dataset.id, 10)
    this.setState({
      editingItem: _.findWhere(this.state.guests, { id }),
    })
  }

  toggleSave() {
    this.setState({ editingItem: {} })
    const request = { guest: this.state.editingItem }
    this.newXHRRequest('PATCH', `/guests/${this.state.editingItem.id}`, request, this.getGuests)
  }

  handleTableEdit(e) {
    const { editingItem } = this.state
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (e.target.name === 'num_invited') {
      if (val) { val = parseInt(val, 10) }
      if (val === 1) {
        editingItem.first_name_2 = ''
        editingItem.last_name_2 = ''
      }
    }
    editingItem[e.target.name] = val
    this.setState({ editingItem, editingTimestamp: new Date() })
  }

  sortData(e) {
    const sortBy = e.currentTarget.dataset.key
    if (!sortBy) { return; }
    const guests = _.clone(this.state.guests)
    const order = this.state.sortBy === sortBy && this.state.order === 'ASC' ? 'DESC' : 'ASC'
    let sortedData = _.sortBy(guests, sortBy)
    if (order === 'DESC') { sortedData = sortedData.reverse(); }
    this.setState({
      guests: sortedData,
      sortBy,
      order,
    })
  }

  render() {
    const rows = this.state.guests.map((guest, i) => {
      const editingGuest = guest.id === this.state.editingItem.id
      return (
        <tr key={`guest-${guest.id}`} onClick={editingGuest ? null : this.toggleEdit} data-id={guest.id}>
          {this.state.cols.map(col => {
            if (!col.key) {
              return (
                <th
                  key={`num-${i}${editingGuest ? '-editing' : ''}`}
                  scope='row'
                  className={`center ${editingGuest ? 'save' : ''}`}
                  onClick={editingGuest ? this.toggleSave : null}
                >{editingGuest ? <i className='far fa-2x fa-save' /> : `${i + 1}`}</th>
              )
            }
            if (editingGuest) {
              return (
                <td className={col.boolean || col.center ? 'center' : ''} key={`${col.key}-${i}-editing`}>
                  {col.boolean ?
                    <div className="form-check">
                      <input
                        className="form-check-input position-static"
                        type="checkbox"
                        checked={guest[col.key] || false}
                        name={col.key}
                        onChange={this.handleTableEdit}
                      />
                    </div>
                    : <input
                      type="text"
                      defaultValue={guest[col.key]}
                      className={`form-control form-control-sm ${col.key}`}
                      placeholder={col.label}
                      aria-label={col.label}
                      name={col.key}
                      onChange={this.handleTableEdit}
                      // disabled={this.state.editingItem.num_invited === 1 && (col.key === 'first_name_2' || col.key === 'last_name_2')}
                    />}
                </td>
              )
            } else {
              return (
                <td className={col.boolean || col.center ? 'center' : ''} key={`${col.key}-${i}`}>
                  {col.boolean ?
                    (guest[col.key] !== null ? <i className={`fa fa-thumbs-${guest[col.key] ? 'up' : 'down'}`} /> : null)
                    : guest[col.key]}
                </td>
              )
            }
          })}
        </tr>
      )
    })

    const tableHeadCells = this.state.cols.map((col) =>
      <th
        key={col.key || 'num'}
        scope='col'
        onClick={this.sortData}
        data-key={col.key}
        className={col.boolean || col.center ? 'center' : ''}
      >{col.label}</th>
    )

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
                        {tableHeadCells}
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
