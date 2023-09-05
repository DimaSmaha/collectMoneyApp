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
					bat 'cd testing && npm install'
				}
		}
		stage('Run Tests'){
				steps{
					bat 'npx playwright test'
				}
		}
	}
}