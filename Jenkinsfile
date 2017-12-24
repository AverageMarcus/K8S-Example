def projectName = 'k8s-example'

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
              script {
                docker.build(projectName)
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
        stage('Deploy') {
            steps {
                script {
                    app.push("${env.GIT_COMMIT}")
                }
            }
        }
    }
}
