pipeline {
	agent any
	stages {
		stage('Clone Git Repo'){
				steps{
					git 'https://github.com/DimaSmaha/collectMoneyApp'
		    }
		}
		stage('Install Dependencies'){
				steps{
                    dir('testing') {
                        bat 'npm install'
                    }
				}
		}
		stage('Run Tests'){
				steps{
				    dir('testing') {
					    bat 'npx playwright test'
				    }
				}
		}
	}
}