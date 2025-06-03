const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function walk(maze: string[], wall: string, current: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    if ((current.y < 0 || current.y >= maze.length) ||
        (current.x < 0 || current.x >= maze[0].length)) {
        return false;
    }
    if (current.x === end.x
        && current.y === end.y) {
        path.push(current);
        return true;
    }
    if (maze[current.y][current.x] === wall) {
        return false;
    }
    if (seen[current.y][current.x]) {
        return false;
    }

    seen[current.y][current.x] = true;

    path.push(current);

    for (let index = 0; index < dir.length; index++) {
        const [delta_x, delta_y] = dir[index];
        if (walk(maze, wall, { x: current.x + delta_x, y: current.y + delta_y }, end, seen, path)) {
            return true;
        }
    }

    path.pop()
    return false;
}


export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let index = 0; index < maze.length; index++) {
        seen.push(new Array(maze[0].length).fill(false))
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
