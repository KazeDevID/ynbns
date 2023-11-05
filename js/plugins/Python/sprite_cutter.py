from PIL import Image
import os

def cut_sprite_sheet(filename, rows, cols, output_dir):
    """Cuts a sprite sheet image into individual images.
    
    Args:
        filename (str): The filename of the sprite sheet image.
        rows (int): The number of rows in the sprite sheet.
        cols (int): The number of columns in the sprite sheet.
        output_dir (str): The directory to save the output images.
    """
    # Create the output directory if it does not exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Open the sprite sheet image
    with Image.open(filename) as img:
        # Calculate the width and height of each image in the sprite sheet
        width, height = img.size
        img_width = width // cols
        img_height = height // rows
        
        # Loop through each row and column, and crop the corresponding image
        for row in range(rows):
            for col in range(cols):
                x0 = col * img_width
                y0 = row * img_height
                x1 = x0 + img_width
                y1 = y0 + img_height
                # Crop the image and save it to the output directory
                img.crop((x0, y0, x1, y1)).save(os.path.join(output_dir, f"image_{row}_{col}.png"))