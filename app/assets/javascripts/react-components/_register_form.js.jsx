/** @jsx React.DOM */

var RegisterForm = React.createClass({

	getInitialState: function(){ 
		return {error_message: ""}
	},

	/*This handles when a new user is being created*/
	handleSubmit: function(event) {
		event.preventDefault();
		var login = this.refs.login.getDOMNode().value
		var first_name = this.refs.first_name.getDOMNode().value
		var last_name = this.refs.last_name.getDOMNode().value
		if (!login || !first_name || !last_name) {
			this.setState({error_message: "Please fill out all form fields"});
		}
		var formData = new FormData(this.refs.form.getDOMNode());
		if(!this.props.onRegister(formData, this.props.action)) {/*Invalid register*/
			this.setState({error_message: "Login is already taken"})
		}
	},

	/*This handles when the user presses the back button*/
	handleBack: function(event) {
		event.preventDefault();
		var WELCOME_PAGE = 0;
		this.props.pageChange(WELCOME_PAGE);
	},

	render: function() {
		return (
			<div className="center-content">
				<p className="error-message">{this.state.error_message}</p>
				<form className="register-form" id="register-form" ref="form" accept-charset="UTF-8" method="post" onSubmit={this.handleSubmit}>
					<input className="input-box" ref="first_name" name="first_name" placeholder="First Name" />
					<input className="input-box" ref="last_name" name="last_name" placeholder="Last Name" />
					<input className="input-box" ref="login" name="login" placeholder="UserID" />
					<input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
				</form><br/>
				<div className="welcome-button button_link" onClick={this.handleBack}>Back</div>
				<button type="submit" form="register-form" className="welcome-button button_link">Register</button>
			</div>
		);
	}
});