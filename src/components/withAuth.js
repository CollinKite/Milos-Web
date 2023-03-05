import React from 'react';

const withAuth = (WrappedComponent) => {
    return class extends React.Component {
        componentDidMount() {
            if (!localStorage.getItem('token')) {
                window.location.href = '/login';
            }
            //make sure token is still valid and if not, remove the token from localstorage and redirect to login
            fetch('https://api.getmilos.app/check', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log('token is valid');
                    } else {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                })
                .catch((error) => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';

                });
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withAuth;
