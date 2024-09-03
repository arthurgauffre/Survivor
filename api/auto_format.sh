#! /usr/bin/env bash
find . -name "*.py" -exec autopep8 --in-place --aggressive --aggressive {} \;