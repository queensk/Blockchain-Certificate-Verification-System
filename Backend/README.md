# BCV App

Description
A Flask web server is a lightweight and scalable web framework used to build web applications in Python. In the context of connecting users, schools, and certificates to blockchain, a Flask web server can be used to create a decentralized and secure platform for managing academic credentials.

The web server can be designed to allow users to create accounts, create a certificate, request the provider school to verify it and receive certificates upon completion. Schools can also create accounts and verify student achievements, while the blockchain ensures the immutability and security of the data.

The Flask web server can be integrated with various blockchain technologies such as Ethereum, Hyperledger Fabric, or Corda, to provide a secure and transparent platform for managing academic credentials. Smart contracts can be used to automate the process of verifying and issuing certificates, while the decentralized nature of the blockchain ensures that the data is secure and tamper-proof.

a Flask web server provides a flexible and scalable solution for connecting users, schools, and certificates to blockchain, and can be used to create a decentralized platform for managing academic credentials that is transparent, secure, and easily accessible.

## Installation

Clone the repository to your local machine.

Install the required dependencies by running the following command:

Copy code

```
pip install -r requirements.txt
```

## Usage

To start the app, you'll need to set the following environment variables:
replace this with your correct env configurations.

### make file .env

```
BCV_MYSQL_USER=BCV_dev
BCV_MYSQL_PWD=BCV_dev_pwd
BCV_MYSQL_HOST=localhost
BCV_MYSQL_DB=BCV_dev_db
BCV_TYPE_STORAGE=db
BCV_API_HOST=0.0.0.0
BCV_API_PORT=5000
BCV_ENV=BCV_DEV
SECRET_KEY=""
```

### Linux

To start the app on Linux, run the following command in the terminal:

```
export BCV_MYSQL_USER=BCV_dev
export BCV_MYSQL_PWD=BCV_dev_pwd
export BCV_MYSQL_HOST=localhost
export BCV_MYSQL_DB=BCV_dev_db
export BCV_TYPE_STORAGE=db
export BCV_API_HOST=0.0.0.0
export BCV_API_PORT=5000
export BCV_ENV=BCV_DEV
export SECRET_KEY=""
python3 -m app.api.v1.app
```

or

```
BCV_MYSQL_USER=BCV_dev BCV_MYSQL_PWD=BCV_dev_pwd BCV_MYSQL_HOST=localhost BCV_MYSQL_DB=BCV_dev_db BCV_TYPE_STORAGE=db BCV_API_HOST=0.0.0.0 BCV_API_PORT=5000 BCV_ENV=BCV_DEV SECRET_KEY="" python3 -m app.api.v1.app
```

### Windows

To start the app on Windows, run the following command in the Command Prompt or PowerShell:

```
$env:BCV_MYSQL_USER="BCV_dev"
$env:BCV_MYSQL_PWD="BCV_dev_pwd"
$env:BCV_MYSQL_HOST="localhost"
$env:BCV_MYSQL_DB="BCV_dev_db"
$env:BCV_TYPE_STORAGE="db"
$env:BCV_API_HOST="0.0.0.0"
$env:BCV_API_PORT="5000"
$env:BCV_ENV="BCV_DEV"
$env:SECRET_KEY=""
python -m app.api.v1.app
```

Contributing
If you'd like to contribute to the project, please fell free to do so and connect with me.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
