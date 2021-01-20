/**
 * CLASS LANE
 */
class Lane {
  constructor(xCoordinate) {
    this.x = xCoordinate;
  }

  /**
   * DRAWS LANE
   */
  draw() {
    context.beginPath();
    context.moveTo(this.x, 0);
    context.lineTo(this.x, CANVAS_HEIGHT);
    context.setLineDash([40, 55]);
    context.lineDashOffset = -offset;
    context.lineWidth = 3;
    context.strokeStyle = '#fff';
    context.stroke();
  }

  /**
   * ANIMATE LANE
   */
  update() {
    offset += carSpeed;
    
  }
}