const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    let A = req.body['A'];
    let B = req.body['B'];
    let C = req.body['C'];
    if(A == null || A == NaN || A == "" || A == " ") {
        A = 1;
    }
    if(B == null || B == NaN || B == "" || B == " ") {
        B = 1;
    }
    if(C == null || C == NaN || C == "" || C == " ") {
        C = 0;
    }
    if(A == 0) {
        if(B == 0) {
            if(C == 0) {
                res.json({A: A, B: B, C: C, ManyRoot: true});
            } else {
                res.json({A: A, B: B, C: C, ZeroRoot: true});
            }
        } else {
            res.json({A: A, B: B, C: C, X: -C/B,OneRoot: true});
        }
    } else {
        const D = B * B - 4 * A * C;

        if(D < 0) {
            res.json({A: A, B: B, C: C, D: D, ZeroRoot: true});
        }
        if(D == 0) {
            Root = B/(-2.0*A);
            res.json({A: A, B: B, C: C, D: 0, OneRoot: true, X: Root});
        }
        if(D > 0) {
            let Root1 = (B - Math.sqrt(D))/(-2.0*A);
            let Root2 = (B + Math.sqrt(D))/(-2.0*A);
            res.json({A: A, B: B, C: C, D: D, TwoRoot: true, X1: Math.min(Root1, Root2), X2: Math.max(Root1, Root2)});
        }
    }
    return res;
});

module.exports = router;