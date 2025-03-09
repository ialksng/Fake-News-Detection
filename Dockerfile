# Use official Python image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy backend files
COPY backend/ .

# Install dependencies
RUN pip install -r requirements.txt

# Expose port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
