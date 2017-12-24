def projectName = 'averagemarcus/k8s-example'
def namespace = env.BRANCH_NAME.toLowerCase()

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
                    sh("kubectl get ns ${namespace} || kubectl create ns ${namespace}")
                    sh("sed -i.bak 's|##image##|10.109.204.83:5000/${projectName}:${env.GIT_COMMIT}|' ./app.yaml")
                    sh("kubectl --namespace=${namespace} apply -f app.yaml")
                    
                    sh("echo \"http://192.168.99.100:\$(kubectl get svc k8s-example --namespace=master -o go-template='{{(index .spec.ports 0).nodePort}}')\"")
                }
            }
        }
    }
}
