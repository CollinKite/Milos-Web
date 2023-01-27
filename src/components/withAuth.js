import React from 'react';

const withAuth = (WrappedComponent) => {
    return class extends React.Component {
        componentDidMount() {
            if (!localStorage.getItem('token')) {
                this.props.history.push('/login');
            }
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withAuth;
