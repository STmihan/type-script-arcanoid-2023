// Types
import { Brick, Ball, Platform } from './sprites';
import { drawRect, drawCircle, drawText, drawLives } from './helpers';
import { SCORE_COLOR, GAME_START_COLOR } from './setup';

export class MainView {
  canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;

  constructor(canvasName: string) {
    this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initStartButton(startFunction: (view: MainView) => void): void {

    let handleKeyUp = (e: KeyboardEvent): void => {
      if (e.code === 'Space' || e.key === 'Space') {
        //console.log('e.code=', e.code, 'e.key=', e.key);
        startFunction(this);
      }
    };

    document.addEventListener('keypress', handleKeyUp);
    
    this.drawInfo('GET READY', GAME_START_COLOR);
    this.waitPressToStart();

  }

  waitPressToStart(){
    this.drawSecondaryInfo('press space', GAME_START_COLOR);  
  }

  drawScore(score: number): void {

    let textPositionY = Math.round(this.canvas.height / 24);
    let textPositionX = this.canvas.width - Math.round(this.canvas.width / 8) 
    let scoreText = `score: ${score}`;
    const fontSize = Math.round(this.canvas.height / 33);
    const font = `bold ${fontSize}px Verdana`;

    drawText(
      this.context,
      SCORE_COLOR,
      font,
      textPositionX,
      textPositionY,
      scoreText,
      'left');

  }
// show hearts of lives
  showLives(countLives: number): void {

    let textPositionY = Math.round(this.canvas.height / 36);
    let textPositionX = Math.round(this.canvas.width * .025) 

    drawLives(
      this.context,
      countLives,
      textPositionX,
      textPositionY
    );
  }

  drawInfo(text: string, color: string): void {

    let textPositionY = Math.round(this.canvas.height / 2);
    let textPositionX = Math.round(this.canvas.width / 2) 
    const fontSize = Math.round(this.canvas.width / 18);
    const font = `bold ${fontSize}px Verdana`;

    drawText(
      this.context,
      color,
      font,
      textPositionX,
      textPositionY,
      text,
      'center');
  }

  drawSecondaryInfo(text: string, color: string): void {

    let textPositionY = Math.round(this.canvas.height / 2) + Math.round(this.canvas.height / 5);
    let textPositionX = Math.round(this.canvas.width / 2) 
    const fontSize = Math.round(this.canvas.width / 22);
    const font = `bold ${fontSize}px Verdana`;

    drawText(
      this.context,
      color,
      font,
      textPositionX,
      textPositionY,
      text,
      'center');
  }

  drawPlatform(platform: Platform): void {
    drawRect(
        this.context,
        platform.color,
        platform.position.x,
        platform.position.y,
        platform.width,
        platform.height
    )
  }

  drawBall(ball: Ball): void {
    drawCircle(
        this.context,
        ball.color,
        ball.position.x,
        ball.position.y,
        ball.radius
    )
  }

  drawBrick(brick: Brick): void {
    drawRect(
        this.context,
        brick.color,
        brick.position.x,
        brick.position.y,
        brick.width,
        brick.height)
  }

  drawBricks(bricks: Brick[]): void {
    bricks.forEach(brick => this.drawBrick(brick));
  }
}