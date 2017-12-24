def projectName = 'averagemarcus/k8s-example'

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
              script {
                app = docker.build(projectName)
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
                    docker.withRegistry('http://10.109.204.83:5000') {
                        app.push("${env.GIT_COMMIT}")
                    }
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
