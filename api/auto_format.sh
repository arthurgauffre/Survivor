#!/usr/bin/env bash

pip install autopep8
find . -name "*.py" -exec autopep8 --in-place --aggressive --aggressive {} \;