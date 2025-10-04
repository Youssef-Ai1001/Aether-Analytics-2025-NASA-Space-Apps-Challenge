# NASA Project
I used ngrok to host my server

## 1. Project Overview

This repository contains code related to NASA data analysis and processing. The project automates the retrieval, preprocessing, and visualization of various NASA datasets, making it easier for researchers and enthusiasts to work with large-scale space and earth science data. Key features include:

- Automated download of NASA datasets from public APIs and repositories.
- Data cleaning and transformation pipelines for consistent analysis.
- Visualization tools for exploring trends and insights in the data.
- Modular code structure for easy extension and integration with other tools.
- Example notebooks and scripts to demonstrate typical workflows.

## 2. Creating a Virtual Environment

To keep dependencies isolated, you can use either `venv` or `conda`:

### Using venv

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### Using conda

```bash
conda create -n nasa-env python=3.10
conda activate nasa-env
```

Install required packages:

```bash
pip install -r requirements.txt
```

## 3. Running the Code

After activating the virtual environment and installing dependencies, run the main script:

```bash
python main.py
```

Refer to the code documentation for additional usage details.