import { Container, Graphics, Text } from 'pixi.js';

export function createButton(
  label: string,
  width: number,
  height: number,
  x: number,
  y: number,
  onClick: () => void,
  fontSize: number = 16,
): Container {
  const button = new Container();

  const bg = new Graphics().roundRect(0, 0, width, height, 6).fill(0x444444);

  const text = new Text({
    text: label,
    style: {
      fontSize,
      fill: 0xffffff,
    },
  });

  text.anchor.set(0.5);
  text.x = width / 2;
  text.y = height / 2;

  button.addChild(bg, text);
  button.x = x;
  button.y = y;

  button.eventMode = 'static';
  button.cursor = 'pointer';
  button.on('pointertap', onClick);

  return button;
}
