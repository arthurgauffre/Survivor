"""init database

Revision ID: 72a18819721a
Revises: 
Create Date: 2024-09-04 12:23:41.479871

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '72a18819721a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('surname', sa.String(), nullable=True),
    sa.Column('birthdate', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('astrologicalSign', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_customers_astrologicalSign'), 'customers', ['astrologicalSign'], unique=False)
    op.create_index(op.f('ix_customers_birthdate'), 'customers', ['birthdate'], unique=False)
    op.create_index(op.f('ix_customers_description'), 'customers', ['description'], unique=False)
    op.create_index(op.f('ix_customers_email'), 'customers', ['email'], unique=True)
    op.create_index(op.f('ix_customers_gender'), 'customers', ['gender'], unique=False)
    op.create_index(op.f('ix_customers_id'), 'customers', ['id'], unique=False)
    op.create_index(op.f('ix_customers_name'), 'customers', ['name'], unique=False)
    op.create_index(op.f('ix_customers_password'), 'customers', ['password'], unique=False)
    op.create_index(op.f('ix_customers_surname'), 'customers', ['surname'], unique=False)
    op.create_table('employees',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('surname', sa.String(), nullable=True),
    sa.Column('birthdate', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('work', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_employees_birthdate'), 'employees', ['birthdate'], unique=False)
    op.create_index(op.f('ix_employees_email'), 'employees', ['email'], unique=True)
    op.create_index(op.f('ix_employees_gender'), 'employees', ['gender'], unique=False)
    op.create_index(op.f('ix_employees_id'), 'employees', ['id'], unique=False)
    op.create_index(op.f('ix_employees_name'), 'employees', ['name'], unique=False)
    op.create_index(op.f('ix_employees_password'), 'employees', ['password'], unique=False)
    op.create_index(op.f('ix_employees_surname'), 'employees', ['surname'], unique=False)
    op.create_index(op.f('ix_employees_work'), 'employees', ['work'], unique=False)
    op.create_table('tips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('tip', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tips_id'), 'tips', ['id'], unique=False)
    op.create_index(op.f('ix_tips_tip'), 'tips', ['tip'], unique=False)
    op.create_index(op.f('ix_tips_title'), 'tips', ['title'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('clothes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_clothes_id'), 'clothes', ['id'], unique=False)
    op.create_index(op.f('ix_clothes_type'), 'clothes', ['type'], unique=False)
    op.create_table('encounters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('source', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_encounters_comment'), 'encounters', ['comment'], unique=False)
    op.create_index(op.f('ix_encounters_date'), 'encounters', ['date'], unique=False)
    op.create_index(op.f('ix_encounters_id'), 'encounters', ['id'], unique=False)
    op.create_index(op.f('ix_encounters_rating'), 'encounters', ['rating'], unique=False)
    op.create_index(op.f('ix_encounters_source'), 'encounters', ['source'], unique=False)
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('max_participants', sa.Integer(), nullable=True),
    sa.Column('location_x', sa.String(), nullable=True),
    sa.Column('location_y', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('employee_id', sa.Integer(), nullable=True),
    sa.Column('location_name', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_events_date'), 'events', ['date'], unique=False)
    op.create_index(op.f('ix_events_duration'), 'events', ['duration'], unique=False)
    op.create_index(op.f('ix_events_id'), 'events', ['id'], unique=False)
    op.create_index(op.f('ix_events_location_name'), 'events', ['location_name'], unique=False)
    op.create_index(op.f('ix_events_location_x'), 'events', ['location_x'], unique=False)
    op.create_index(op.f('ix_events_location_y'), 'events', ['location_y'], unique=False)
    op.create_index(op.f('ix_events_max_participants'), 'events', ['max_participants'], unique=False)
    op.create_index(op.f('ix_events_name'), 'events', ['name'], unique=False)
    op.create_index(op.f('ix_events_type'), 'events', ['type'], unique=False)
    op.create_table('payementHistory',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('payment_method', sa.String(), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_payementHistory_amount'), 'payementHistory', ['amount'], unique=False)
    op.create_index(op.f('ix_payementHistory_comment'), 'payementHistory', ['comment'], unique=False)
    op.create_index(op.f('ix_payementHistory_date'), 'payementHistory', ['date'], unique=False)
    op.create_index(op.f('ix_payementHistory_id'), 'payementHistory', ['id'], unique=False)
    op.create_index(op.f('ix_payementHistory_payment_method'), 'payementHistory', ['payment_method'], unique=False)
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_roles_id'), 'roles', ['id'], unique=False)
    op.create_index(op.f('ix_roles_name'), 'roles', ['name'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_roles_name'), table_name='roles')
    op.drop_index(op.f('ix_roles_id'), table_name='roles')
    op.drop_table('roles')
    op.drop_index(op.f('ix_payementHistory_payment_method'), table_name='payementHistory')
    op.drop_index(op.f('ix_payementHistory_id'), table_name='payementHistory')
    op.drop_index(op.f('ix_payementHistory_date'), table_name='payementHistory')
    op.drop_index(op.f('ix_payementHistory_comment'), table_name='payementHistory')
    op.drop_index(op.f('ix_payementHistory_amount'), table_name='payementHistory')
    op.drop_table('payementHistory')
    op.drop_index(op.f('ix_events_type'), table_name='events')
    op.drop_index(op.f('ix_events_name'), table_name='events')
    op.drop_index(op.f('ix_events_max_participants'), table_name='events')
    op.drop_index(op.f('ix_events_location_y'), table_name='events')
    op.drop_index(op.f('ix_events_location_x'), table_name='events')
    op.drop_index(op.f('ix_events_location_name'), table_name='events')
    op.drop_index(op.f('ix_events_id'), table_name='events')
    op.drop_index(op.f('ix_events_duration'), table_name='events')
    op.drop_index(op.f('ix_events_date'), table_name='events')
    op.drop_table('events')
    op.drop_index(op.f('ix_encounters_source'), table_name='encounters')
    op.drop_index(op.f('ix_encounters_rating'), table_name='encounters')
    op.drop_index(op.f('ix_encounters_id'), table_name='encounters')
    op.drop_index(op.f('ix_encounters_date'), table_name='encounters')
    op.drop_index(op.f('ix_encounters_comment'), table_name='encounters')
    op.drop_table('encounters')
    op.drop_index(op.f('ix_clothes_type'), table_name='clothes')
    op.drop_index(op.f('ix_clothes_id'), table_name='clothes')
    op.drop_table('clothes')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_tips_title'), table_name='tips')
    op.drop_index(op.f('ix_tips_tip'), table_name='tips')
    op.drop_index(op.f('ix_tips_id'), table_name='tips')
    op.drop_table('tips')
    op.drop_index(op.f('ix_employees_work'), table_name='employees')
    op.drop_index(op.f('ix_employees_surname'), table_name='employees')
    op.drop_index(op.f('ix_employees_password'), table_name='employees')
    op.drop_index(op.f('ix_employees_name'), table_name='employees')
    op.drop_index(op.f('ix_employees_id'), table_name='employees')
    op.drop_index(op.f('ix_employees_gender'), table_name='employees')
    op.drop_index(op.f('ix_employees_email'), table_name='employees')
    op.drop_index(op.f('ix_employees_birthdate'), table_name='employees')
    op.drop_table('employees')
    op.drop_index(op.f('ix_customers_surname'), table_name='customers')
    op.drop_index(op.f('ix_customers_password'), table_name='customers')
    op.drop_index(op.f('ix_customers_name'), table_name='customers')
    op.drop_index(op.f('ix_customers_id'), table_name='customers')
    op.drop_index(op.f('ix_customers_gender'), table_name='customers')
    op.drop_index(op.f('ix_customers_email'), table_name='customers')
    op.drop_index(op.f('ix_customers_description'), table_name='customers')
    op.drop_index(op.f('ix_customers_birthdate'), table_name='customers')
    op.drop_index(op.f('ix_customers_astrologicalSign'), table_name='customers')
    op.drop_table('customers')
    # ### end Alembic commands ###
