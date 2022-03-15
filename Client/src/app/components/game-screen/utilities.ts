export function random(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

export function get_position_facing(direction: number, x: number, y: number, step_size: number) {
  var new_position;
  switch (direction) {
    case 0:
      new_position = { x: x, y: y - step_size };
      break;
    case 1:
      new_position = { x: x + step_size, y: y };
      break;
    case 2:
      new_position = { x: x, y: y + step_size };
      break;
    case 3:
      new_position = { x: x - step_size, y: y };
      break;
    default:
      new_position = { x: x, y: y };
      break;
  }
  return new_position;
}
