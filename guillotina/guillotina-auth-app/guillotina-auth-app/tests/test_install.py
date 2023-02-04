import pytest


pytestmark = [pytest.mark.asyncio]


async def test_install(guillotina-auth-app_requester):  # noqa
    async with guillotina-auth-app_requester as requester:
        response, _ = await requester('GET', '/db/guillotina/@addons')
        assert 'guillotina-auth-app' in response['installed']
