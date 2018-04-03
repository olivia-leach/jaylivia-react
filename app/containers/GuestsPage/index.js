import React from 'react';
import Helmet from 'react-helmet';
import _ from 'underscore'
import Sticky from 'components/Sticky'

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
        { label: 'First Name', key: 'first_name_2', needsGuest: true },
        { label: 'Last Name', key: 'last_name_2', needsGuest: true },
        { label: 'RSVP', key: 'rsvp', boolean: true, center: true },
        { label: 'RSVP (2)', key: 'rsvp_2', boolean: true, center: true, needsGuest: true },
        // { label: '# Invited', key: 'num_invited', center: true },
        { label: 'Fri. Drinks', key: 'rsvp_welcome_drinks', center: true },
        { label: 'Brunch', key: 'rsvp_brunch', center: true },
        { label: 'Shuttles', key: 'shuttles', center: true },
        { label: 'Hotel', key: 'hotel', limitWidth: true },
        { label: 'Note', key: 'note', limitWidth: true },
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
    this.downloadData = this.downloadData.bind(this)
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

  downloadData() {
    this.exportTableToCSV.apply($('#downloadCSV'), [this.state.guests, 'jaylivia-guests']);
  }

  exportTableToCSV(data, filename) {
    const convertObjsToCSV = (objArray) => {
      // Temporary delimiter characters unlikely to be typed by keyboard
      // This is to avoid accidentally splitting the actual contents
      const tmpColDelim = String.fromCharCode(11); // vertical tab character
      const tmpRowDelim = String.fromCharCode(0); // null character

      // actual delimiter characters for CSV format
      const colDelim = '","';
      const rowDelim = '"\r\n"';

      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const index in array[i]) {
          if (line !== '') line += tmpColDelim
          const nextItem = array[i][index] === null ? '' : array[i][index]
          line += nextItem.toString().replace(/"/g, '""'); // escape double quotes
        }

        str += line + tmpRowDelim;
      }
      str = '"' + str // append missing " to front of string
      return str.split(tmpRowDelim).join(rowDelim).split(tmpColDelim).join(colDelim)
    }

    const headerRow = _.keys(data[0])
    data.unshift(headerRow)
    const formattedData = convertObjsToCSV(data)
    const csvData = new Blob([formattedData], { type: 'text/csv' })
    const csvURL = URL.createObjectURL(csvData)

    if (window.navigator.msSaveBlob) { // IE 10+
      window.navigator.msSaveOrOpenBlob(new Blob([formattedData], { type: "text/plain;charset=utf-8;" }), filename)
    } else {
      $(this).attr({ download: filename, href: csvURL });
    }
  }

  signInSuccess(response) {
    const person = response.user.email[0].toUpperCase() + _.rest(response.user.email).join('')
    this.setState({
      token: response.user.token,
      person,
    })

    sessionStorage.setItem('token', response.user.token)
    sessionStorage.setItem('person', person)
    this.getGuests()
  }

  getGuests() {
    this.newXHRRequest('GET', '/guests', null, this.guestFetchSuccess)
  }

  guestFetchSuccess(response) {
    const guests = _.sortBy(response.guests, 'last_name')
    let rsvpYesCount = 0
    let rsvpNoCount = 0
    let rsvpNullCount = 0
    let numInvited = 0

    _.map(guests, g => {
      if (g.rsvp) { rsvpYesCount += 1 }
      if (g.rsvp_2) { rsvpYesCount += 1 }
      if (g.rsvp === false) { rsvpNoCount += 1 }
      if (g.rsvp_2 === false) { rsvpNoCount += 1}
      if (g.rsvp === null) { rsvpNullCount += 1 }
      if (g.num_invited > 1 && g.rsvp_2 === null) { rsvpNullCount += 1}
      numInvited += g.num_invited
    })

    this.setState({
      guests,
      rsvpYesCount,
      rsvpNoCount,
      rsvpNullCount,
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
    const baseUrl = 'http://localhost:4741'
    // const baseUrl = 'https://jaylivia-api.herokuapp.com'
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(JSON.parse(xhr.response));
      } else {
        console.error(xhr);
      }
    });
    xhr.addEventListener('error', () => onRejected(xhr));
    xhr.open(method, baseUrl + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (path === '/guests' && this.state.token) {
      xhr.setRequestHeader('Authorization', `Token token=${this.state.token}`);
    }
    if (content) {
      xhr.send(JSON.stringify(content));
    } else {
      xhr.send()
    }
  }

  toggleEdit(e) {
    // const id = parseInt(e.currentTarget.dataset.id, 10)
    // this.setState({
    //   editingItem: _.findWhere(this.state.guests, { id }),
    // })
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
    const nullVals = _.filter(guests, g => g[sortBy] === null)
    const haveVals = _.filter(guests, g => g[sortBy] !== null)
    let sortedData = _.sortBy(haveVals, sortBy)
    if (order === 'DESC') { sortedData = haveVals.reverse(); }
    sortedData = _.union(sortedData, nullVals)
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
                <td className={`${col.boolean || col.center ? 'center' : ''}${col.limitWidth ? 'limit-width' : ''}${col.needsGuest && guest.num_invited < 2 ? ' disabled' : ''}`} key={`${col.key}-${i}`}>
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
                  <div className='flex center'>
                    <p><span className='big'>{this.state.numInvited}</span> invited</p>
                    <p><span className='big'>{this.state.rsvpYesCount}</span> guests attending</p>
                    <p><span className='big'>{this.state.rsvpNoCount}</span> guests declined</p>
                    <p><span className='big'>{this.state.rsvpNullCount}</span> guests not responded</p>
                    <p><span className='big'>{Math.round(this.state.rsvpYesCount / (this.state.rsvpNoCount + this.state.rsvpYesCount)) * 100}%</span> acceptance rate</p>
                  </div>
                  <div className='flex end'>
                    <a id='downloadCSV' onClick={this.downloadData} className='btn btn-sm btn-secondary'>Download</a>
                  </div>
                  <div className='table-container'>
                    <Sticky id='guests-table-header' margin={70} theresholdOffset={70} top>
                      <table className="table">
                        <thead>
                          <tr>
                            {tableHeadCells}
                          </tr>
                        </thead>
                        <tbody className='secret'>
                          {rows}
                        </tbody>
                      </table>
                    </Sticky>
                    <table className="table">
                      <thead className='secret'>
                        <tr>
                          {tableHeadCells}
                        </tr>
                      </thead>
                      <tbody>
                        {rows}
                      </tbody>
                    </table>
                  </div>
                </div>}
            </div>
          }
        </div>
      </article>
    );
  }
}
