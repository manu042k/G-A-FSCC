# Django Project Setup on macOS

This README provides instructions for setting up and running a Django project on macOS.

## Prerequisites

- macOS operating system
- Terminal application

## Setup Instructions

### 1. Python Installation

macOS comes with Python pre-installed. To install the latest Python:

1. Install Homebrew (if not already installed):

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Python using Homebrew:

   ```
   brew install python
   ```

3. Verify the installation:
   ```
   python3 --version
   ```

### 2. Virtual Environment Creation

1. Navigate to your project directory:

   ```
   cd Backend
   ```

2. Create a virtual environment:

   ```
   python3 -m venv myenv
   ```

3. Activate the virtual environment:
   ```
   source myenv/bin/activate
   ```

### 3. Install Requirements

Assuming you have a `requirements.txt` file in your project directory:

1. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

### 4. Boot Django Server

1. Navigate to the directory containing `manage.py`:

   ```
   cd dgrocery
   ```

2. ```
   python manage.py makemigrations
   ```

````
3.  ```
python manage.py migarte
````

4. Custom command to load json data into the database
   ```
   python manage.py load_product static/coding_challenge_groceries.json
   ```
5. Run the Django development server:

   ```
   python manage.py runserver
   ```

6. Open a web browser and go to `http://127.0.0.1:8000/` to view your Django project.

## Additional Notes

- To deactivate the virtual environment when you're done, simply run:

  ```
  deactivate
  ```
