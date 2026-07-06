from fastapi import FastAPI

app = FastAPI()


@app.get("/", status_code=200)
def health_check():
    return {"status": "ok"}


@app.get("/items")
def get_items():
    return []


@app.post("/items")
def create_item():
    return {}


@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {}


@app.put("/items/{item_id}")
def update_item(item_id: int):
    return {}


@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {}
