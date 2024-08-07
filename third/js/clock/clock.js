const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;

ctx.translate(radius, radius);

function drawClock() {
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = radius * 0.05;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
        const ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // Hour
    const hourAngle = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07);

    // Minute
    const minuteAngle = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minuteAngle, radius * 0.8, radius * 0.07);

    // Second
    const secondAngle = (second * Math.PI / 30);
    drawHand(ctx, secondAngle, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

setInterval(drawClock, 1000);