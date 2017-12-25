def projectName = env.JOB_NAME.toLowerCase()
def namespace = env.BRANCH_NAME.toLowerCase()

def externalIP = '192.168.99.100'
def privateRegistery = 'http://10.109.204.83:5000'

pipeline {
    agent any

    options {
      buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    stages {
        stage('Build') {
            steps {
                script {
                    app = docker.build(projectName)
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry(privateRegistery) {
                        app.push("${env.GIT_COMMIT}")
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh """
                    kubectl get ns ${namespace} || echo '{"kind": "Namespace","apiVersion": "v1","metadata": {"name": "${namespace}","labels": {"temp": "true"}}}' | kubectl apply -f -
                    sed -i.bak 's|##image##|10.109.204.83:5000/${projectName}:${env.GIT_COMMIT}|' ./app.yaml
                    kubectl --namespace=${namespace} apply -f app.yaml
                """
            }
        }
        stage('Comment') {
            when {
                not {
                    branch 'master'
                }
            }
            steps {
                script {
                    def url = sh(
                        script: "echo \"http://${externalIP}:\$(kubectl get svc k8s-example --namespace=master -o go-template='{{(index .spec.ports 0).nodePort}}')\"",
                        returnStdout: true
                    )
                    pullRequest.comment(url)
                }
            }
        }
    }
}
