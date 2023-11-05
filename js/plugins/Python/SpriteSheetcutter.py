from PIL import Image
import os

print("Current working directory:", os.getcwd())
image_path = "RikacounterFinal.png" # Replace with the actual file path
print("Image path:", os.path.abspath(image_path))
# Load the sprite sheet image
sheet = Image.open(image_path)

# Define the number of rows and columns in the sheet
num_rows = 1
num_cols = 9

# Calculate the width and height of each sprite
sprite_width = sheet.width // num_cols
sprite_height = sheet.height // num_rows

# Iterate over each sprite in the sheet
for row in range(num_rows):
    for col in range(num_cols):
        # Define the region of interest for this sprite
        x0 = col * sprite_width
        y0 = row * sprite_height
        x1 = x0 + sprite_width
        y1 = y0 + sprite_height

        # Extract the sprite image from the sheet
        sprite = sheet.crop((x0, y0, x1, y1))

        # Save the sprite image to a file
        file_name = image_path.replace(".png", "")
        filename = f"{file_name}_{col+1}.png"
        sprite.save(filename)




