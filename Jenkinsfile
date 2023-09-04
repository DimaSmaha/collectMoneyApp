pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install -g playwright'
        sh 'npm install -g live-server'  
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