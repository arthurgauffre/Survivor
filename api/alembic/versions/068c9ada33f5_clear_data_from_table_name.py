"""Clear data from table_name

Revision ID: 068c9ada33f5
Revises: fb6ba91008b4
Create Date: 2024-09-03 15:27:09.273098

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '068c9ada33f5'
down_revision: Union[str, None] = 'fb6ba91008b4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
