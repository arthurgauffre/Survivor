from unittest.mock import MagicMock
from api.crud.tips.tipsGet import Tips, getAllTips
from api.schemas.tipsSchemas import AllTipsSchema

db_mock = MagicMock()


def test_get_all_tips_found(monkeypatch):
    tips = [
        Tips(id=1, title="Tip 1", tip="This is the first tip"),
        Tips(id=2, title="Tip 2", tip="This is the second tip")
    ]

    db_mock.query.return_value.all.return_value = tips

    result = getAllTips(db_mock)

    expected = [
        AllTipsSchema(id=1, title="Tip 1", tip="This is the first tip"),
        AllTipsSchema(id=2, title="Tip 2", tip="This is the second tip")
    ]
    assert [r.dict() for r in result] == [e.dict() for e in expected]


def test_get_all_tips_not_found(monkeypatch):
    db_mock.query.return_value.all.return_value = []

    result = getAllTips(db_mock)

    assert result == []
