from dotenv import load_dotenv
import os

load_dotenv()

IBM_API_KEY = os.getenv("IBM_API_KEY")
IBM_DEPLOYMENT_ENDPOINT = os.getenv("IBM_DEPLOYMENT_ENDPOINT")