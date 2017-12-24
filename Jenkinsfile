def projectName = 'averagemarcus/k8s-example'

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
              script {
                app = docker.build("${projectName}:${env.GIT_COMMIT}")
              }
            }
        }
        stage('Test') {
            steps {
              script {
                sh("docker run --entrypoint npm ${projectName} test")
              }
            }
        }
        stage('Push') {
            steps {
                script {
                    app.push()
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying (TODO)'
            }
        }
    }
}
