pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Node App') {
            steps {
                echo 'Building Node.js Docker image...'
                sh 'docker build -t node-app ./node-app'
            }
        }

        stage('Build Python App') {
            steps {
                echo 'Building Python Docker image...'
                sh 'docker build -t python-app ./python-app'
            }
        }

        stage('Run SonarQube Analysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token')
            }
            steps {
                echo 'Running SonarQube analysis...'
                sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=security-pipeline-demo \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://localhost:9000 \
                    -Dsonar.login=$SONAR_TOKEN
                '''
            }
        }

        stage('Push to DockerHub') {
            environment {
                DOCKERHUB_CREDENTIALS = credentials('dockerhub')
            }
            steps {
                echo 'Pushing Docker images to DockerHub...'
                sh '''
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker tag node-app yourdockerhubusername/node-app:latest
                    docker tag python-app yourdockerhubusername/python-app:latest
                    docker push yourdockerhubusername/node-app:latest
                    docker push yourdockerhubusername/python-app:latest
                '''
            }
        }
    }
}
