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
                script {
                    sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
                    sh("sed -i.bak 's|##image##|http://10.109.204.83:5000/${projectName}:${env.GIT_COMMIT}|' ./app.yaml")
                    sh("cat ./app.yaml")
                    sh("kubectl --namespace=${env.BRANCH_NAME} apply -f app.yaml")
                }
            }
        }
    }
}
