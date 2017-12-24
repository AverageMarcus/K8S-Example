
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
              script {
                docker.build('K8S-Example')
              }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
