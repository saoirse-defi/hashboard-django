# Hashboard-Django

## Project Overview

Hashboard-Django is a comprehensive web application designed to provide users with in-depth analytics and insights into their cryptocurrency transactions. It leverages a Django backend and React frontend to deliver a seamless user experience. The application integrates with blockchain explorers like Etherscan and Solscan to retrieve transaction data, which is then processed by custom AI agents to generate actionable insights and visualisations.

## Technologies

* **Backend:**
    * Django (Python): A high-level Python web framework.
    * Django REST Framework: For building powerful and flexible Web APIs.
    * PostgreSQL: As the primary database for storing user data and transaction records.
    * Celery: For asynchronous task processing, especially for data retrieval and AI analysis.
    * Redis: As a Celery broker and cache.
    * Python libraries: `requests`, `py-etherscan-api`, `solana-web3.js/web3`, and others for blockchain interaction and data manipulation.
* **Frontend:**
    * React (JavaScript): A JavaScript library for building user interfaces.
    * Axios: For making HTTP requests to the Django backend.
    * React Router: For client-side routing.
    * Redux or Context API: For state management.
    * Javascript libraries for data visualisation such as chart.js, or D3.js
* **Data Processing and AI:**
    * n8n: A no-code workflow automation tool for orchestrating data retrieval and AI analysis.
    * LLMs (Large Language Models): For parsing transaction data and generating insights.
    * Vector databases for storing embeddings.
* **Blockchain Explorers:**
    * Etherscan API: For Ethereum transaction data.
    * Solscan API: For Solana transaction data.

## Features

* **User Authentication:** Secure user login and registration.
* **Cryptocurrency Address Submission:** Users can submit their Ethereum and Solana addresses.
* **Transaction Data Retrieval:** Automatic retrieval of transaction data from Etherscan and Solscan.
* **Database Storage:** Storage of transaction data in the PostgreSQL database.
* **AI-Powered Insights:**
    * Profit and loss analysis.
    * Gas cost analysis.
    * Transaction categorisation and summaries.
    * Anomaly detection.
    * Generation of embeddings of transaction data.
* **Data Visualisation:**
    * Interactive charts and graphs to visualise transaction data.
    * Customisable dashboards.
* **n8n Workflows:** Automation of data retrieval and AI analysis using n8n.
* **LLM Integration:** Parsing and analysis of transaction data using LLMs.
* Vector Database integration to perform semantic searches of transaction data.

## Project Setup

### Prerequisites

* Python 3.x
* Node.js and npm
* PostgreSQL
* Redis
* n8n
* API keys for Etherscan and Solscan.

### Backend Setup (Django)

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd hashboard-django/backend
    ```

2.  **Create a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate  # On Windows
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure the database:**

    * Create a PostgreSQL database.
    * Update the `DATABASES` settings in `hashboard/settings.py` with your database credentials.

5.  **Run migrations:**

    ```bash
    python manage.py migrate
    ```

6.  **Create a superuser:**

    ```bash
    python manage.py createsuperuser
    ```

7.  **Run the development server:**

    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    * Create a `.env` file in the frontend directory.
    * Set the `VITE_API_URL` variable to the Django backend's API URL.

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

### n8n Setup

1.  **Install and configure n8n:**

    * Follow the n8n installation instructions.
    * Setup the required credentials for the LLM, and database.

2.  **Import n8n workflows:**

    * Import the provided n8n workflows for data retrieval and AI analysis.

3.  **Configure n8n nodes:**

    * Update the database credentials and API keys in the n8n nodes.
    * Setup the vector database nodes.

### API Integration

1.  **Etherscan API:**

    * Obtain an API key from Etherscan.
    * Configure the API key in the Django backend and n8n workflows.

2.  **Solscan API:**

    * Obtain an API key from Solscan.
    * Configure the API key in the Django backend and n8n workflows.

### Deployment

* **Backend:** Deploy the Django application to a production server (e.g., Heroku, AWS, Google Cloud).
* **Frontend:** Build the React application for production and deploy it to a static hosting service (e.g., Netlify, Vercel, AWS S3).
* **Database:** Setup a production ready database.
* **n8n:** Deploy n8n to a production server, and ensure it has proper resource allocation.

### Future Enhancements

* Support for more blockchain networks.
* Advanced AI analysis and prediction.
* Customisable dashboards and reports.
* Integration with other cryptocurrency services.
* Implement real time updates using websockets.

### Contributing

Contributions are welcome! Please follow the contributing guidelines.
