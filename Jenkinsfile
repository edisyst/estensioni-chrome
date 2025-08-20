stage('Quality Checks') {
    parallel {
        stage('Lint') {
            steps {
                sh 'echo "Simulazione lint"'
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'echo "Simulazione test unitari"'
            }
        }
        stage('Security Scan') {
            steps {
                sh 'echo "Simulazione scan sicurezza"'
            }
        }
    }
}
