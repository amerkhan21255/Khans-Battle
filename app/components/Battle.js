const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleChange(event) {
    const value = event.target.value;

    this.setState(()=> ({username: value}))
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

   render () {
     const {username} = this.state
const {label} = this.props

    return (
<form className = 'column' onSubmit ={this.handleSubmit}>
<label className = 'header' htmlFor = 'username'>
{label} </label>
<input 
id = 'username'
placeholder = 'github username'
type = 'text'
autoComplete = 'off'
value = {username}
onChange= {this.handleChange}
/>

<button 
className = 'button'
type = 'submit'
disabled = {!username} >
submit
</button>
</form>
    )
  }
}
PlayerInput.PropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component {
    constructor(props) {
        super(props);
this.state = {
    playerOneName: "",
    playerTwoName: "",
    playerOneImage: null,
    playerTwoImage: null
}
this.handleSubmit = this.handleSubmit.bind(this);
this.handleReset = this.handleReset.bind(this);
    }
    handleSubmit(id, username) {
      this.setState(()=> ({
        [id + 'Name']: username,
        [id + 'Image']: 'https://github.com/${username}.png?size=200'
      }))
    }

    handleReset(id) {
  this.setState(() => ({
    [id + 'Name']: '',
    [id + 'Image']: null
  }))
 }
  render() {
    const {match} = this.props;
    const {playerOneName,playerTwoName,playerOneImage,playerTwoImage} =this.state
    return (
      <div>
        <div className = "row">

{!playerOneName && 
<PlayerInput
id = 'playerOne'
label = 'Player One'
onSubmit = {this.handleSubmit}
/>}

      {playerOneImage !==null &&
        <PlayerPreview
            avatar = {playerOneImage}
              username = {playerOneName}>
            <button className='reset'
            onClick = {this.handleReset.bind(null, 'playerOne')}>
            Reset
            </button>
              </PlayerPreview>}


{!playerTwoName && 
<PlayerInput
  id = 'playerTwo'
  label = 'Player Two'
  onSubmit = {this.handleSubmit}
  />}

{playerTwoImage !==null &&
<PlayerPreview
avatar = {playerTwoImage}
username = {playerTwoName}>
 <button className='reset'
            onClick ={() => {this.handleReset('playerTwo')}>
            Reset
            </button>
</PlayerPreview>}


          </div>

          {
            playerOneImage && playerTwoImage &&
          <Link
          className = 'button'
          to= {{
            pathname: match.url + '/results',
            search: '?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}'
          }}>

          Battle
          
          </Link>
          }
      </div>
    )}
}

module.exports = Battle;