export default function drawCircle(
    context: CanvasRenderingContext2D | null,
    color: string,
    x: number,
    y: number,
    radius: number

){
    if(!context){
        return;
    }

    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
}