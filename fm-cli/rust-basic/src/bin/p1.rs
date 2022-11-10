fn get_input() -> &'static str {
    return "forward 5
down 5
forward 8
up 3
down 8
forward 2";
}

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn parse_line(line: &'static str) -> Point {
    let (dir, a) = line.split_once(" ").expect("can not split parse.");
    let amount = a.parse::<i32>().unwrap();
    if dir == "down" {
        return Point { x: 0, y: amount };
    } else if dir == "up" {
        return Point { x: 0, y: -amount };
    }
    return Point { x: amount, y: 0 };
}

fn main() {
    let pos = get_input()
        .lines()
        .map(parse_line)
        .fold(Point { x: 0, y: 0 }, |mut acc, p| {
            acc.x += p.x;
            acc.y += p.y;
            return acc;
        });
    println!("{:?}", pos.x * pos.y);
}
