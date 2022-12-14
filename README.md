```yaml
  - name: setup bumpup
    uses: danielr1996/gh-actions-bumpup@v4
    with:
      version: '0.0.1-beta.16'
  - name: version
    run: bumpup
```
