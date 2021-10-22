package com.neutron.core.utils;

import javax.swing.*;
import java.awt.*;

public class ImageScale {
    public static ImageIcon getImage(ImageIcon icon, int width, int height) {
        Image image = icon.getImage().getScaledInstance(width, height, Image.SCALE_REPLICATE);
        icon.setImage(image);
        return icon;
    }
}
