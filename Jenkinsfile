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
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
                        sh("cat /root/.dockercfg")
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
