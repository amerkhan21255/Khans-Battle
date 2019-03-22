const React = require('react');
const PropTypes = require('prop-types');
const styles = {
        content: {
            textAlign: 'center',
            fontSize: '35px'
        }
    };
    class Loading extends React.Component { 
        constructor(props) {
            super(props);

            this.state = {
                text: props.text
            };
        }
        
componentDidMount() {
    const {text,speed} = this.props
    const stopper = text + '...';

    this.interval = window.setInterval(() =>{
        this.state.text === stopper
            ? this.setState(() => ({ text:props.text}))
            : this.setState((prevState) => ({ text: prevState.text + '.'}))
           
        },speed )
    }
componentWillUnmount() {
    window.clearInterval(this.interval;)
}


    render() {
         return (
<p style ={styles.content}>
    {this.state.text}
    </p>
         )
     }
 }

Loading.PropTypes = {
    text : PropTypes.string.isRequired
};

Loading.defaultProps = {
    text: 'Loading'
};

 module.exports = Loading;