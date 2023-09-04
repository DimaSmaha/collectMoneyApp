pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/DimaSmaha/collectMoneyApp', branch: 'master')
      }
    }
    stage('Install Dependencies') {
      steps {
        sh '''
            npm install -g playwright'
            npm install -g live-server
        '''  
      }
    }
    stage('Start Server') {
      steps {
        sh 'live-server --port:5500'
      }
    }
    stage('Run Tests') {
      steps {
        dir('testing') {
          sh 'playwright test'
        }
      }
    }
  }
}