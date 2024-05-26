import json
import os
import random
import string

def generate(len):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(len))

def create_posts(n):
    posts = []
    for i in range(n):
        post = {
            "id": i + 1,
            "title": generate(10),
            "author": {
                "name": generate(10),
                "email": generate(10) + "@gmail.com"
            },
            "content": generate(20)
        }
        posts.append(post)
    return {"notes": posts}

def save(posts, file_path):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as file:
        json.dump(posts, file, indent=5)

def main():
    n = int(input("Enter the number of posts (1-10): "))
    n = max(1, min(n, 10))
    posts = create_posts(n)
    save(posts, "./data/notes.json")

if __name__ == "__main__":
    main()
