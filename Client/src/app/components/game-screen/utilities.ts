export function random(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

export function get_position_facing(position:{direction: number, x: number, y: number},
                                    step_size: number,
                                    boundX: {min: number, max: number},
                                    boundY: {min: number, max: number}) {
  var new_position;
  switch (position.direction) {
    case 0:
      new_position = { x: position.x, y: position.y - step_size };
      break;
    case 1:
      new_position = { x: position.x + step_size, y: position.y };
      break;
    case 2:
      new_position = { x: position.x, y: position.y + step_size };
      break;
    case 3:
      new_position = { x: position.x - step_size, y: position.y };
      break;
    default:
      new_position = { x: position.x, y: position.y };
      break;
  }
  new_position.x = checkWrapAround(new_position.x, boundX.max);
  new_position.y = checkWrapAround(new_position.y, boundY.max);
  return new_position;
}

export function checkWrapAround(position: number, bound: any): number {
  if (position <= 0 || position >= bound)
    return ((position % bound) + bound) % bound;
  else
  return position;
}
