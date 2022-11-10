use anyhow::{anyhow, Result};
use std::str::FromStr;

fn get_input() -> &'static str {
    return "0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2";
}

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

#[derive(Debug)]
struct GoodLine {
    p1: Point,
    p2: Point,
}

impl GoodLine {
    fn is_h_or_v(&self) -> bool {
        return self.p1.x == self.p2.x || self.p2.x == self.p2.y;
    }
}

impl FromStr for Point {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self> {
        let result = s.split_once(",");
        if result.is_none() {
            return Err(anyhow!("expected a point to contain a comma"));
        }

        let (x, y) = result.unwrap();
        let x = str::parse(x)?;
        let y = str::parse(y)?;
        return Ok(Point { x, y });
    }
}

impl FromStr for GoodLine {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self> {
        let result = s.split_once(" -> ");
        if result.is_none() {
            return Err(anyhow!("expected a line with -> "));
        }

        let (p1, p2) = result.unwrap();
        let p1 = str::parse(p1)?;
        let p2 = str::parse(p2)?;
        return Ok(GoodLine { p1, p2 });
    }
}

fn main() {
    // let l = Line {
    //     p1: Point { x: 1, y: 2 },
    //     p2: Point { x: 1, y: 2 },
    // };
    let l: GoodLine = str::parse("1,2 -> 2,3").unwrap();
    println!("{:?}", l);

    let lines = get_input()
        .lines()
        .flat_map(str::parse)
        .filter(|x: &GoodLine| x.is_h_or_v())
        .collect::<Vec<GoodLine>>();
    println!("{:?}", lines);
}
